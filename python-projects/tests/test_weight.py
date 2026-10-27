import unittest

from support import run_solution


class WeightTest(unittest.TestCase):
    def test_case_01_w_120(self):
        """W = 120."""
        result = run_solution('weight', '120\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Box is Heavier\n')

    def test_case_02_w_99(self):
        """W = 99."""
        result = run_solution('weight', '99\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Box is Heavy\n')

    def test_case_03_w_100_prints_heavier(self):
        """W = 100 prints Heavier."""
        result = run_solution('weight', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Box is Heavier\n')


if __name__ == "__main__":
    unittest.main()
