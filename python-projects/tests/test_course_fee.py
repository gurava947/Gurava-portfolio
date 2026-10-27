import unittest

from support import run_solution


class CourseFeeTest(unittest.TestCase):
    def test_case_01_m_100(self):
        """M = 100."""
        result = run_solution('course-fee', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Discount is 200\n')

    def test_case_02_m_75(self):
        """M = 75."""
        result = run_solution('course-fee', '75\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Discount is 100\n')

    def test_case_03_m_30(self):
        """M = 30."""
        result = run_solution('course-fee', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No Discount\n')


if __name__ == "__main__":
    unittest.main()
