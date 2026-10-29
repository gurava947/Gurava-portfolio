import unittest

from support import run_solution


class TimeConversionTest(unittest.TestCase):
    def test_case_01_90(self):
        """90M."""
        result = run_solution('time-conversion', '90M\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.5H\n')

    def test_case_02_7200(self):
        """7200S."""
        result = run_solution('time-conversion', '7200S\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.0H\n')


if __name__ == "__main__":
    unittest.main()
