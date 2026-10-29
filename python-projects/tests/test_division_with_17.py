import unittest

from support import run_solution


class DivisionWith17Test(unittest.TestCase):
    def test_case_01_34_and_50(self):
        """34 and 50."""
        result = run_solution('division-with-17', '2\n34\n50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n2\n')

    def test_case_02_17(self):
        """17."""
        result = run_solution('division-with-17', '1\n17\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
